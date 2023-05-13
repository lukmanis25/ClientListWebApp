using ClientListWebApp.Models;

namespace ClientListWebApp.Services.Interfaces
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetAllCategory();
        Category GetCategory(int id);
        public bool IsCategoryExist(int id);
    }
}
