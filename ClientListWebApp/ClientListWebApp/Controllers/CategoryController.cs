using ClientListWebApp.Models;
using ClientListWebApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ClientListWebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }


        [HttpGet]
        public IEnumerable<Category> Get()
        {
            var categories = _categoryService.GetAllCategory();
            return categories;
        }

        [HttpGet]
        [Route("{id}")]
        public Category Get(int id)
        {
            var category = _categoryService.GetCategory(id);
            return category;
        }
    }
}
