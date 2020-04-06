export const state = () => ({
    user:{

    },
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

    ],
    validation_state:false,
    // for default layout
    route:''
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
                delete this.state.resources[i];
            }
        }
    },
    set_validation_state(state,payload){
        this.state.validation_state = payload
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
