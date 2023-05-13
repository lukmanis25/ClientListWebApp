using ClientListWebApp.Models;

namespace ClientListWebApp.Services.Interfaces
{
    public interface IClientService
    {
        int Save(Client client); 
        IEnumerable<Client> GetAllClients();
        Client GetClient(int id);
        int DeleteClient(int id);
        int UpdateClient(int id, Client client);
        public bool IsEmailAvailble(string email);
    }
}
