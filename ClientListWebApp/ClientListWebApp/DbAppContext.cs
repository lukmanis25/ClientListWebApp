using ClientListWebApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace ClientListWebApp
{
    public class DbAppContext : IdentityDbContext<User>
    {
        public DbAppContext(DbContextOptions<DbAppContext> options) : base(options)
        {

        }

        public DbSet<Client>  Clients { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Client>().HasKey(t => t.CategoryId);
            
            modelBuilder.Entity<Client>()
                .HasOne(e => e.Category)
                .WithMany()
                .HasForeignKey(e => e.CategoryId)
                .IsRequired();
            base.OnModelCreating(modelBuilder);
        }

    }
}
