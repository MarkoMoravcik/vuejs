<template>
  <form>
          <b-jumbotron fluid>

    <section v-if="step == 1">
        <h4><b>Vyberte typ strihu</b></h4>
        <b-form-group>
          <b-form-radio v-model="cutType" value="BASIC_CUT" size="sm" id="idA"
            >Základný strih (30 min) - 8 €</b-form-radio
          >
          <b-form-radio v-model="cutType" value="BASIC_BEARD" size="sm" id="idB"
            >Základný strih + úprava brady (40 min) - 12 €</b-form-radio
          >
          <b-form-radio v-model="cutType" value="EXCLUSIVE_CUT" size="sm" id="idC"
            >Exclusive strih (50 min) - 14 €</b-form-radio
          >
          <b-form-radio v-model="cutType" value="EXCLUSIVE_BEARD" size="sm" id="idD"
            >Exclusive strih + úprava brady(60 min) - 18 €</b-form-radio
          >
        </b-form-group>
    </section>

    <section v-if="step == 2">
        <h4><b>Vyberte dátum a čas</b></h4>
        <v-date-picker
          id="xx"
          v-model="reservationDate"
          mode="single"
          color="indigo"
          min="2016-06-15"
          :min-date='new Date()'
          :disabled-dates='{ weekdays: [1, 7] }'
          :available-dates='{ start: new Date(), end: reservationFreeDates[reservationFreeDates.length-1]}'
          is-dark
          is-inline
        />
    </section>
    <section v-if="step == 3">
        <h4><b>Vyplňte Vaše osobné údaje</b></h4>
        <br>
        <b-col sm="4">
            <b-form-input :type="text" v-model="form.customerName" placeholder="Meno a priezvisko"></b-form-input>
            <b-form-input :type="email" v-model="form.customerMail" placeholder="E-mail"></b-form-input>
            <b-form-input :type="tel" v-model="form.customerPhoneNumber"></b-form-input>
        <b-form-textarea
          id="textarea"
          v-model="text"
          placeholder="Poznámka k rezervácií..."
          rows="3"
          max-rows="6"
        ></b-form-textarea> </b-col>
 
    </section>
    <b-button v-if="step != 1" @click.prevent="previousStep">Späť</b-button>
    <b-button v-if="step != totalSteps" @click.prevent="nextStep">OK</b-button>
    <b-button v-if="step == totalSteps" @click.prevent="createReservation"
      >Rezervovať termín</b-button
    >
      </b-jumbotron>

  </form>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from 'axios';

@Component({
  components: {
  },
  props: {
    actualDate:{
      type: String
    },
    totalSteps:{
      type: Number,
      default: 3
    },
    cutType:{
      type: String,
      default: "BASIC_CUT"
    },
    step: {
      type: Number,
      default: 1
    },
    reservationFreeDates: {
      type: Array,
      default: [
        new Date(2019, 7, 4),
        new Date(2019, 7, 10),
        new Date(2019, 7, 11)
      ]
    },
    form: {
      type: Array,
      default: {
        customerPhoneNumber: "+421",
        customerName: "",
        customerMail: "",
      }
    },
    posts: {
      type: Array
    }
  }
})

export default class Reservation extends Vue {
  storage_key = 'test-storage';
  step!: number;
  cutType!: string;
  reservationFreeDates!: Array<Date>;
  reservationDate!: Date;
  totalSteps!: number;
  form!: Array<Object>;
  posts!: Array<Object>;

  createReservation(){
    localStorage.setItem(this.storage_key, JSON.stringify(this.form))
    //localStorage.setItem(this.storage_key, JSON.stringify())
  }

  mounted() {
    this.reservationDate = new Date();
    //this.form = JSON.parse(localStorage.getItem(this.storage_key) || "[+421]");
    
  }

  created(){

    axios.get(`http://jsonplaceholder.typicode.com/posts`).then(response => {
      this.posts = response.data
     })
    .catch(e => {
      
    })
  }

  nextStep() {
    this.step++;
  }

  previousStep() {
    this.step--;
  }
}
</script>
<style>

.custom-control-input:checked ~ .custom-control-label {
  color: #1a202c;
  font-weight: bold;
}
.btn.btn-secondary {
  background-color: #6a7fd1;
}

.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #6a7fd1;
  background-color: #6a7fd1;
}
</style>
