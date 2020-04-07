<template>
  <div class="avatar" @click="expanded = !expanded">
    <div class="profile" v-if="user">
      <img v-if="user.pictureUrl != null" src="/images/profile.jpg" />
      <div
        class="textImg"
        :style="color"
        v-else
      >
        <span>{{ initials }}</span>
      </div>
      <span>Mein Profil</span>
    </div>

    <div class="dropdown" v-if="expanded">
      <button @click="$router.push('register')">Edit Profile</button>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Action, namespace, Component } from "nuxt-property-decorator";
import {
  User
} from "@/apollo/schema";

import me from "@/apollo/queries/user.gql";

const auth = namespace("auth");

interface localUser {
  firstName: string,
  lastName: string,
  pictureUrl?: string
}

@Component
export default class extends Vue {
  // Set de background color for the text avatar
  get color() {
    // TODO: Save color in db
    return `background: ${'#'+(Math.random()*0xFFFFFF<<0).toString(16)};`
  }

  // funtion to get the user
  async getUser(): Promise<localUser> {
    const result = await this.$apollo.query({
      query: me
    });
    return new Promise<localUser>((resolve, reject) => {
      if(true) {
        resolve({
          firstName: result.data.me.firstName,
          lastName: result.data.me.lastName,
          pictureUrl: result.data.me.pictureUrl
        });
      } else {
        reject();
      }
    })
  }

  // set the user
  user: localUser = {
    firstName: '',
    lastName: ''
  };

  created() {
    this.getUser()
      .then((user) => {
        this.user = user
      })
  }

  // create the initials based on the users first & last name
  get initials(): string {
    return `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}`.toUpperCase()
  }

  // expanded dropdown
  expanded: boolean = true;

  @auth.Action('logout')
  logout(): void {
    // this.$store.dispatch("auth/logout");
    this.$router.push("/");
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors';

.avatar {
  cursor: pointer;

  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;

    .textImg, img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    span {
      margin-left: 15px;
      cursor: default;
    }

    .textImg {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      span {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
      }
    }
  }

  .dropdown {
    position: absolute;
    top: 100px;
    right: 50px;
    z-index: 10;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    border: 1px solid #E7E7E7;
    background: $uiComponent;

    button {
      margin: 10px;
      width: 50px;
      height: 40px;
    }
  }
}
</style>
