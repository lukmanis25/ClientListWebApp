﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;

namespace ClientListWebApp.Models
{
    [PrimaryKey(nameof(Id))]
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<SluzbowySubcategory>? SluzbowySubcategories { get; } = new List<SluzbowySubcategory>();
        public bool? IsOther { get; set; } = false;
    }
}
