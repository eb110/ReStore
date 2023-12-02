using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // controller => products -> as class name is products -> the controller is skipped
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;      
        }

        [HttpGet] //api/products
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpGet("{id}")] //api/products/3
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            return await _context.Products.FindAsync(id);
        }
    }
}