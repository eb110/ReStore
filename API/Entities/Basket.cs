using System.Linq.Expressions;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        //randomly generated id for unsigned users
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if(Items.Any(item => item.ProductId == product.Id))
                Items.First(item => item.ProductId == product.Id).Quantity += quantity;
            else
                Items.Add(new BasketItem{Product = product, Quantity = quantity});
        }

        public void RemoveItem(int productId, int quantity)
        {
            if(Items.Any(item => item.ProductId == productId))
            {
                var item = Items.Single(item => item.ProductId == productId);
                item.Quantity -= quantity;
                if(item.Quantity <= 0)
                    Items.Remove(item);
            }
        }

    }

}