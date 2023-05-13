using Azure;
using Azure.Core;
using ClientListWebApp.Models;
using ClientListWebApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace ClientListWebApp.Services
{
    public class ClientService : IClientService
    {
        private readonly DbAppContext _appContext;

        public ClientService(DbAppContext context)
        {
            _appContext = context;
        }

        public int DeleteClient(int id)
        {

            var client = _appContext.Clients.FirstOrDefault(e => e.Id == id);
            if (client == null)
            {
                return -1;
            }
            else
            {
                _appContext.Clients.Remove(client);
                _appContext.SaveChanges();
                return 0;
            }
        }

        public IEnumerable<Client> GetAllClients()
        {
            var clients = _appContext.Clients.ToList();
            return clients;
        }

        public Client GetClient(int id)
        {
            var client = _appContext.Clients.Find(id);
            return client;
        }

        public int Save(Client client)
        {
            //Check if email doesnt already exist
            if (!IsEmailAvailble(client.Email))
            {
                return -1;
            }
            //chcek if category exist
            if (!(_appContext.Categories.Any(m => m.Id == client.CategoryId)))
            {
                return -1;
            }
            _appContext.Clients.Add(client);
            _appContext.SaveChanges();
            return 0;
        }

        public int UpdateClient(int id, Client client)
        {
            var entity = _appContext.Clients.FirstOrDefault(e => e.Id == id);
            if (entity == null)
            {
                return -1;
            }
            else
            {
                //Check if there is someone with new email
                if ((_appContext.Clients.Any(m => ( m.Email == client.Email && m.Id != id))))
                {
                    return -1;
                }

                entity.Name = client.Name;
                entity.Surname = client.Surname;
                entity.Email = client.Email;
                entity.Phone = client.Phone;
                entity.Category = client.Category;
                entity.Subcategory = client.Subcategory;
                entity.DateOfBirth =  client.DateOfBirth;
                entity.CategoryId = client.CategoryId;
                
                _appContext.SaveChanges();
                return 0;
            }
        }
        public bool IsEmailAvailble(string email)
        {
            var ans = !(_appContext.Clients.Any(m => m.Email == email));
            return ans;

        }
    }
}
