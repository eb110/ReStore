import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = "http://localhost:5000/api/";

const sleep = () => new Promise(resolve => setTimeout(resolve, 300));

interface ProductDto {
  brand: string;
  description: string;
  name: string;
  pictureUrl: string;
  price: number;
  quantityInStock: number;
  type: string;
}

interface errorResponseData {
  status: number;
  title: string;
  errors?: Record<string, string[]>;
}

const responseBody = (response: AxiosResponse): object => response.data as object;

//if no error then return the response but if error then handle its status display
//by toast feature
axios.interceptors.response.use(
  async response => {
    await sleep();
    return response;
  },
  async (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data as errorResponseData;
    switch (status) {
      //validation errors are also 400 type of errors
      case 400:
        //validation errors
        if (data.errors) {
          const modelStateErrors: string[][] = Object.keys(data.errors).map(
            (key) => data.errors?.[key] || []
          );
          throw modelStateErrors.flat();
        }
        //non validation errors
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        await router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        await router.navigate("/not-found");
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: ProductDto) =>
    axios.post(url, body).then(responseBody),
  put: (url: string, body: ProductDto) =>
    axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
