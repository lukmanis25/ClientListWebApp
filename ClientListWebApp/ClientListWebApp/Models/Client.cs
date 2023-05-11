using System.ComponentModel.DataAnnotations;

namespace ClientListWebApp.Models
{
    public class Client
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Category { get; set; }

        public string Subcategory { get; set; }
        public int Phone { get; set; }
        public string DateOfBirth { get; set; } //Change it !!

    }
}
