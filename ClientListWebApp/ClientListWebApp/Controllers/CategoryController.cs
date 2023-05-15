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
        public IActionResult Get()
        {
            var categories = _categoryService.GetAllCategory();
            return Ok(categories);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryService.GetCategory(id);
            return Ok(category);
        }
    }
}
