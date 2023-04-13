const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
      inProcess: [],
      inContact: [],
      won: [],
      loss: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => {
        fetch(process.env.DATABASE_URL + "/agenda", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            console.log(response.json());
            console.log(process.env.DATABASE_URL);
            return response.json();
          })
          .then((data) => {
            setStore({
              contacts: data,
            });
          })
          .catch((error) => console.log(error));
      },
      addContact: async (full_name, email, address, phone, status, history) => {
        let response = await fetch("http://localhost:3001" + "/add", {
          method: "POST",
          body: JSON.stringify({
            full_name: full_name,
            email: email,
            address: address,
            phone: phone,
            status: status,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(() => getActions().loadSomeData())
          .then(() => history.push("/contacts"));
      },
      editContact: async (full_name, email, address, phone, status, id) => {
        let response = await fetch(
          process.env.DATABASE_URL + "/update/" + id.toString(),
          {
            method: "PUT",
            body: JSON.stringify({
              full_name: full_name,
              email: email,
              address: address,
              phone: phone,
              status: status,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        getActions().loadSomeData();
      },
      updateStatus: async (updateContact, contactId) => {
        // console.log(updateContact, contactId);
        const store = getStore();
        let updatedContact = {};
        let updatedList = [];
        for (let contact of store.contacts) {
          if (contact.id == contactId) {
            Object.assign(updatedContact, contact, updateContact);
            updatedList.push(updatedContact);
          } else {
            updatedList.push(contact);
          }
        }
        setStore({
          contacts: updatedList,
        });
      },
      deleteContact: async (id) => {
        let response = await fetch(
          process.env.DATABASE_URL + "/delete/" + id.toString(),
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(() => getActions().loadSomeData());
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.DATABASE_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
