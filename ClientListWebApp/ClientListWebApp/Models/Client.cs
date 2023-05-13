using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClientListWebApp.Models
{
    [PrimaryKey(nameof(Id))]
    public class Client
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [MinLength(6)]
        [RegularExpression(@"^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)).+$")] 
        //Minimum one big letter, one small letter, one digit and minimum 6 chars
        public string Password { get; set; }


        [Required]
        public string Subcategory { get; set; }

        [Required]
        [MinLength(9)]
        [RegularExpression(@"^[+]?[0-9]+$")]
        public string Phone { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        //[Required]
        //[ForeignKey("Categories")]
        public int CategoryId { get; set; }
        public virtual Category? Category { get; set; } = null!;


    }
}
