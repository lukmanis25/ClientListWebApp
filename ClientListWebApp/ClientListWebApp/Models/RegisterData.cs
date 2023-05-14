using System.ComponentModel.DataAnnotations;

namespace ClientListWebApp.Models
{
    public class RegisterData
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
