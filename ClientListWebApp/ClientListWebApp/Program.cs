using ClientListWebApp;
using ClientListWebApp.Models;
using ClientListWebApp.Services;
using ClientListWebApp.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

//services
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

//db
builder.Services.AddDbContext<DbAppContext>(builder =>
{

    builder.UseSqlServer("Data Source=LUKAS;Initial Catalog=DbClients12;Integrated Security=True;TrustServerCertificate=True");
});

//Identity

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;

}).AddEntityFrameworkStores<DbAppContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
