using ClientListWebApp.Models;
using ClientListWebApp.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ClientListWebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager; 
        private readonly SignInManager<User> _signInManager;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }


        [HttpPost]
        [Route("register")]
        public async Task<bool> Register(RegisterData registerData)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }

            var result = await _userManager.CreateAsync(new User
            {
                UserName = registerData.Login,
            }, registerData.Password); //hashed password


            return true;
        }

        [HttpPost]
        [Route("login")]
        public async Task<bool> Login(LoginData loginData)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }

            var result = await _signInManager.PasswordSignInAsync(loginData.Login, loginData.Password, false, false);



            return true;
        }

        [HttpPost]
        [Route("logout")]
        public async Task<bool> LogOut()
        {
            var res = _signInManager.SignOutAsync();
            return true;
        }


    }
}
