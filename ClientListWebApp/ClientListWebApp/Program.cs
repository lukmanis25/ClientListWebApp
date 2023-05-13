using ClientListWebApp;
using ClientListWebApp.Services;
using ClientListWebApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddDbContext<DbAppContext>(builder =>
{

    builder.UseSqlServer("Data Source=LUKAS;Initial Catalog=DbClients11;Integrated Security=True;TrustServerCertificate=True");
});

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


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
