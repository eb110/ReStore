using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //controller -> the name of the controller will be collected from the class name 
    //which inherits from BaseApiController
    //Example: 'ProductsController' -> api/products
    public class BaseApiController : ControllerBase
    {
        
    }
}