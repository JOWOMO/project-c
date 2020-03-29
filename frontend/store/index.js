export const state = () => ({
    register_state:{
        user:{

        },
        company:{

        },
        team:{

        }
    },
    positions:{
        profile: true,
        company: false,
        team: false,
    },
    tags:[
    ],
    resources:[

    ]
})

export const mutations = {
    register_user_state(state, payload){
        this.state.register_state.user = payload
    },
    register_company_state(state, payload){
        this.state.register_state.company = payload
    },
    register_team_state(state, payload){
        this.state.register_state.team = payload
    },
    updateUser(state, payload){
        this.state.user = payload
    },
    update_position(state, payload){
        this.state.positions = payload.positions
    },
    add_tag(state, payload){
        console.log("tag pushed: ",payload);
        // TODO: add to array 
        this.state.tags.push({
            "skill":payload           
        })
    },
    delete_tag(state,payload){
        for(var i in this.state.tags){
            console.log("tag: ", this.state.tags[i]);
            if(this.state.tags[i].skill == payload)
            {
                console.log("Tag löschen", payload); 
                delete this.state.tags[i];
            }
        }
    },
    add_resource(state, payload){
        console.log("tag pushed: ",payload);
        // TODO: add to array 
        this.state.resources.push({
            "resource":payload           
        })
    },
    delete_resource(state,payload){
        for(var i in this.state.resources){
            console.log("tag: ", this.state.resources[i]);
            if(this.state.resources[i].resource == payload)
            {
                console.log("Tag löschen", payload); 
                delete this.state.resources[i];
            }
        }
    }
}

export const actions = {
    async add_user ({ commit }, payload) {
        console.log('user', payload)
          await this.$axios.$post("http://localhost:5000/users", {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.emial,
          passwort: payload.pwd,
        }).then((response)=>{
            console.log("response db: ",response);
            commit('updateUser', payload)
        }).catch((err)=>{
            console.log("error db: ",err);
        });
        
    },
    async add_company ({ commit }, payload) { // TODO: Add user id to company profile
        console.log('company', payload)
          await this.$axios.$post("http://localhost:5000/companies", {
              name: payload.company_name,
              location:{
                  address:payload.company_addr,
                  post_code:payload.company_postCode
              },
              employees: payload.employees
        }).then((response)=>{
            console.log("response db: ",response);
            commit('updateUser', payload)
        }).catch((err)=>{
            console.log("error db: ",err);
        });
        
    },
}

export const getters = {
    get_user(state) {
        return state.user;
    },
    get_sidebar_position(state){
        return state.positions;
    },
    get_tags(state){
        return state.tags;
    }
}
