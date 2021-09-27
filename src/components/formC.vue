<template>
  <!--<form  action="https://5d9f7fe94d823c0014dd323d.mockapi.io/api/message" method="post">-->
  <form class="formC" onsubmit="return false">
    <div class="input">
      <label for="name">Name<span class="error"> *</span></label>
      <input name="name" v-model="name" type="text" v-on:blur="checkField('name')" placeholder="Write your name">
      <div v-for="error in v$.name.$errors" :key="error.$uid">
        <p class="error">{{ displayError('name',error) }}</p>
      </div>
    </div>
    <div class="input">
      <label for="email">Email<span class="error"> *</span></label>
      <input name="email" v-model="email" type="email" v-on:blur="checkField('email')" placeholder="Your email goes here">
      <div v-for="error in v$.email.$errors" :key="error.$uid">
        <p class="error">{{ displayError('email',error) }}</p>
      </div>
    </div>
    <div class="input">
      <label for="subject">Subject</label>
      <input name="subject" v-model="subject" type="text" v-on:blur="checkField('subject')" placeholder="Do you have a subject?">
      <div v-for="error in v$.subject.$errors" :key="error.$uid">
        <p class="error">{{ displayError('subject',error) }}</p>
      </div>
    </div>
    <div class="input">
      <label for="message">Message</label>
      <textarea name="message" v-model="message" v-on:blur="checkField('message')" rows="5 " placeholder="Go wild with your message!"></textarea>
      <div v-for="error in v$.message.$errors" :key="error.$uid">
        <p class="error">{{ displayError('message',error) }}</p>
      </div>
    </div>

    <input type="submit" value="Send" @click="submit()">
    <!--<button @click="submit()">Submit</button>-->
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'

export default {
  name:"formC",
  props:["typeMode"],
  setup () {
    return { v$: useVuelidate() }
  },
  data(){
    return{
      name:"",
      email:"",
      subject:"",
      message:"",
      errors:{
        name_required:"Name is required",
        name_min_length:"Name must be at least 5 characters long",
        name_max_length:"Name must be under 50 characters long",
        email_required:"Email is required",
        email_invalid:"Email is not valid",
        subject_max_length:"Subject must be under 100 characters long",
        message_max_length:"Message must be under 500 characters long",
      }
    }
  },
  validations () {
    return {
      name: { required, minLengthValue: minLength(5), maxLengthValue:maxLength(50) },
      email: { required, email },
      subject: { maxLengthValue:maxLength(100) },
      message: { maxLengthValue:maxLength(500) }
    }
  },
  methods:{
    submit(){
      console.log(this.v$);
      alert('hi');
    },
    checkField(fieldName){
      if(!this.typeMode)
        this.v$[fieldName].$touch();
    },
    displayError(fieldName,error){
      switch (fieldName) {
        case 'name':
          if(error.$validator.includes('required')){
            return this.errors.name_required;
          }
          else if(error.$validator.includes('max')){
            return this.errors.name_max_length;
          }
          else{
            return this.errors.name_min_length;
          }
        case 'email':
          if(error.$validator.includes('required')){
            return this.errors.email_required;
          }
          else{
            return this.errors.email_invalid;
          }
        case 'subject':
          return this.errors.subject_max_length;
        case 'message':
          return this.errors.message_max_length;
      }
    }
  },
  watch:{
    name(){
      if(this.typeMode)
        this.v$.name.$touch();
    },
    email(){
      if(this.typeMode)
        this.v$.email.$touch();
    },
    subject(){
      if(this.typeMode)
        this.v$.subject.$touch();
    },
    message(){
      if(this.typeMode)
        this.v$.message.$touch();
    },
  }
}
</script>

<style scoped>
.input{
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
}
.error{
  margin: 0.5em 0;
  color: rgb(230, 90, 90);
  font-size: 0.85em;
}
textarea{
  resize: none;
}
</style>