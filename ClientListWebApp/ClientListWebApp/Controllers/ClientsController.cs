using ClientListWebApp.Models;
using ClientListWebApp.Services.Interfaces;
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
        public IEnumerable<Client> Get()
        {
            var clients = _clientService.GetAllClients();
            return clients;
        }

        [HttpGet]
        [Route("{id}")]
        public Client Get(int id)
        {   
            var client = _clientService.GetClient(id);
            return client;
        }

        [HttpPost]
        public bool PostClient(Client client)
        {
            if (client == null) return false;
            int code = _clientService.Save(client);
            return code == 0; //change return bool to normal response !!
        }

        [HttpDelete("{id}")]
        public bool DeleteClient(int id) 
        {
            int code = _clientService.DeleteClient(id);
            return code == 0;
        }

        [HttpPut("{id}")]
        public bool PutClient(int id, Client client) 
        {
            int code = _clientService.UpdateClient(id, client);
            return code == 0;
        }
    }
}
