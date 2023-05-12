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
       


        private static IList<Client> Clients = new[]
        {
            new Client{Id = 1, Name = "Łukasz", Surname = "Smolinski"},
            new Client{Id = 2, Name = "Jan", Surname = "Kowalski"}
        };

        private readonly IClientService _clientService;
        public ClientsController(IClientService clientService)
        {
             _clientService = clientService;
        }


        [HttpGet]
        public IList<Client> Get()
        {

            return Clients;
        }

        [HttpGet]
        [Route("{id}")]
        public Client Get(int id)
        {
            //oblsuga braku takiego uzytkownika
            return Clients.Where(c => c.Id == id ).First();
        }

        [HttpPost]
        public bool PostClient(Client client)
        {
            if (client == null) return false;
            //Clients.Append(client);

            int i = _clientService.Save(client);

            return true;
        }

        [HttpDelete("{id}")]
        public bool DeleteClient(int id) 
        {
            
            foreach (var c in Clients)
            {
                if(c.Id == id)
                {
                    //Clients.Remove(c);
                    return true;
                }
            }
            return false;
        }

        [HttpPut("{id}")]
        public bool PutClient(int id, Client client) 
        {

            foreach (var c in Clients)
            {
                if (c.Id == id)
                {
                    //Clients.Remove(c);
                    //Clients.Append(client);
                    return true;
                }
            }
            return false;
        }
    }
}
