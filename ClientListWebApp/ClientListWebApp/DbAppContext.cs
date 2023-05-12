using ClientListWebApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientListWebApp
{
    public class DbAppContext : DbContext
    {
        public DbAppContext(DbContextOptions<DbAppContext> options) : base(options)
        {

        }

        public DbSet<Client>  Clients { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
