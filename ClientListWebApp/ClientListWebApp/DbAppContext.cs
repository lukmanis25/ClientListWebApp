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
