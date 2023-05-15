using ClientListWebApp.Models;
using ClientListWebApp.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Xml.Linq;

namespace ClientListWebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientsController : ControllerBase
    {
       

        private readonly IClientService _clientService;
        public ClientsController(IClientService clientService)
        {
             _clientService = clientService;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var clients = _clientService.GetAllClients();
            return Ok(clients);
        }

        
        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {   
            var client = _clientService.GetClient(id);
            return Ok(client);
        }

        [HttpPost]
        [Authorize]
        public IActionResult PostClient(Client client)
        {
            if (client == null) return BadRequest(false);
            int code = _clientService.Save(client);
            return code == 0 ? Ok(true) : BadRequest(false);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteClient(int id) 
        {

            int code = _clientService.DeleteClient(id);
            return code == 0 ? Ok(true) : BadRequest(false);
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult PutClient(int id, Client client) 
        {
            int code = _clientService.UpdateClient(id, client);
            return code == 0 ? Ok(true) : BadRequest(false);
        }
    }
}
