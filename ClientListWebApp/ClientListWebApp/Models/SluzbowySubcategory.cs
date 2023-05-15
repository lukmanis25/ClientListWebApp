using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ClientListWebApp.Models
{
    [PrimaryKey(nameof(Id))]
    public class SluzbowySubcategory
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public int CategoryId { get; set; }
    }
}
