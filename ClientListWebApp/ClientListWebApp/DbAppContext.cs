using ClientListWebApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace ClientListWebApp
{
    public class DbAppContext : IdentityDbContext<User>
    {
        public DbAppContext(DbContextOptions<DbAppContext> options) : base(options)
        {

        }

        public DbSet<Client>  Clients { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SluzbowySubcategory> SluzbowySubcategories { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Initial Data
            var cat1 = new Category { Id = 1, Name = "służbowy" };
            var cat2 = new Category { Id = 2, Name = "prywatny" };
            var cat3 = new Category { Id = 3, Name = "inny", IsOther = true };

            var subcat1 = new SluzbowySubcategory { Id = 1, Name = "klient", CategoryId = 1 };
            var subcat2 = new SluzbowySubcategory { Id = 2, Name = "szef", CategoryId = 1 };

            modelBuilder.Entity<Category>().HasData(cat1, cat2, cat3);
            modelBuilder.Entity<SluzbowySubcategory>().HasData(subcat1, subcat2);

            //Relations
            modelBuilder.Entity<Client>()
                .HasOne(e => e.Category)
                .WithMany()
                .HasForeignKey(e => e.CategoryId)
                .IsRequired();
            modelBuilder.Entity<Category>()
                .HasMany(e => e.SluzbowySubcategories)
                .WithOne()
                .HasForeignKey(e => e.CategoryId);

            base.OnModelCreating(modelBuilder);
        }

    }
}
