using ClientListWebApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace ClientListWebApp
{
    public class DbAppContext : DbContext
    {
        public DbAppContext(DbContextOptions<DbAppContext> options) : base(options)
        {

        }

        public DbSet<Client>  Clients { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Client>().HasKey(t => t.CategoryId);
            //base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Client>()
                .HasOne(e => e.Category)
                .WithMany()
                .HasForeignKey(e => e.CategoryId)
                .IsRequired();
        }

    }
}
