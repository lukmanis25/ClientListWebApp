using Azure;
using Azure.Core;
using ClientListWebApp.Models;
using ClientListWebApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace ClientListWebApp.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly DbAppContext _appContext;

        public CategoryService(DbAppContext context)
        {
            _appContext = context;
        }
        public IEnumerable<Category> GetAllCategory()
        {
            var categories = _appContext.Categories.ToList();
            return categories;
        }

        public Category GetCategory(int id)
        {
            var category = _appContext.Categories.Find(id);
            return category;
        }
        public bool IsCategoryExist(int id)
        {
            var ans = _appContext.Categories.Any(m => m.Id == id);
            return ans;

        }
    }
}
