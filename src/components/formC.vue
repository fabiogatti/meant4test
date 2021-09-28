<template>
  <!--<form  action="https://5d9f7fe94d823c0014dd323d.mockapi.io/api/message" method="post">-->
  <form class="formC" onsubmit="return false" :mode="negMode">
    <div class="input-div">
      <label for="name">Name<span class="error"> *</span></label>
      <input id="name"
        name="name" 
        v-model="name" 
        type="text" 
        v-on:blur="checkField('name')" 
        :class="borderClass('name')"
        @focus="focusChanged('name')"
        placeholder="Write your name">
      <transition name="fade">
        <div v-for="error in v$.name.$errors" :key="error.$uid">
          <p id="nameError" v-show="!focus.name || typeMode" class="error absolute nameError">{{ displayError('name',error) }}</p>
        </div>
      </transition>
    </div>
    <div class="input-div">
      <label for="email">Email<span class="error"> *</span></label>
      <input id="email"
        name="email" 
        v-model="email" 
        type="email" 
        v-on:blur="checkField('email')" 
        :class="borderClass('email')"
        @focus="focusChanged('email')"
        placeholder="Your email goes here">
      <transition name="fade">
        <div v-for="error in v$.email.$errors" :key="error.$uid">
          <p id="emailError" v-show="!focus.email || typeMode" class="error absolute">{{ displayError('email',error) }}</p>
        </div>
      </transition>
    </div>
    <div class="input-div">
      <label for="subject">Subject</label>
      <input id="subject"
        name="subject" 
        v-model="subject" 
        type="text" 
        v-on:blur="checkField('subject')" 
        :class="borderClass('subject')"
        @focus="focusChanged('subject')"
        placeholder="Do you have a subject?">
      <transition name="fade">
        <div v-for="error in v$.subject.$errors" :key="error.$uid">
          <p id="subjectError" v-show="!focus.subject || typeMode" class="error absolute">{{ displayError('subject',error) }}</p>
        </div>
      </transition>
    </div>
    <div class="input-div">
      <label for="message">Message</label>
      <textarea id="message"
        name="message" 
        v-model="message" 
        v-on:blur="checkField('message')" 
        :class="borderClass('message')"
        @focus="focusChanged('message')"
        rows="5" 
        placeholder="Go wild with your message!"></textarea>
      <transition name="fade">
        <div v-for="error in v$.message.$errors" :key="error.$uid">
          <p id="messageError" v-show="!focus.message || typeMode" class="error absolute">{{ displayError('message',error) }}</p>
        </div>
      </transition>
    </div>

    <!--<input class="btn" type="submit" value="Send" @click="submit()">-->
    <button class="btn" @click="submit()">Submit</button>
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
      },
      focus:{name:false,email:false,subject:false,message:false},
      negMode:!this.typeMode
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
    async submit(){
      if(this.name.length>0 && this.email.length>0 && this.v$.$errors.length==0){
        let message = JSON.stringify({
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message
        });
        const endpoint = 'https://5d9f7fe94d823c0014dd323d.mockapi.io/api/message';
        let request = {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: message
        }
        fetch(endpoint,request).then(async response =>{
          let data = await response.json();
          if(!response.ok){
            alert((data && data.message) || "Couldn't send message, response status: "+response.status);
          }
          else{
            alert('Success, message sent!');
          }
        });

      }
      else{
        alert('Please fill all required camps correctly');
        return
      }
      
    },
    checkField(fieldName){
      this.focus[fieldName] = false;
      if(!this.typeMode)
        this.v$[fieldName].$touch();
      //document.getElementById(fieldName).classList.remove("focused");
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
    },
    borderClass(fieldName){
      if(!this.v$[fieldName].$dirty)
        return 'clean';
      return this.v$[fieldName].$errors.length == 0 ? 'valid' : 'invalid'
    },
    focusChanged(fieldName){
      this.focus[fieldName] = true;
      if(!this.typeMode)
        this.v$[fieldName].$reset()
      /*document.getElementById(fieldName).classList.add('focused');*/

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
    typeMode(newVal){
      this.negMode = !newVal;
    }
  }
}
</script>

<style scoped>
.formC{
  width: 35%;
}
.input-div{
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
  position: relative;
}
.input-div label{
  text-align: left;
  margin-bottom: 0.75em;
  color:var(--text-color);
  padding-left: 0.4em;
}
input,textarea{
  transition: all 0.1s ease;
  padding: 1em;
  border-radius: 15px;
  outline: none;
  background-color: var(--color-white);
  color:var(--input-color);
}

.error{
  margin: 0.5em 0;
  color: var(--invalid-color-error);
  font-size: 0.85em;
  text-align: right;
}
.absolute{
  position: absolute;
  width: 100%;
}
textarea{
  resize: none;
}

.invalid{
  border: solid 2px var(--invalid-color);
}
.valid{
  border: solid 2px var(--valid-color);
}
.clean{
  /*border: solid 2px var(--input-border-color);*/
  border: none;
}


.formC[mode] :focus{
  border: solid 2px rgba(0, 0, 0, 0.35);
}

::placeholder{
  opacity: 0.65;
}

.btn{
  transition: all 0.4s ease;
  background: none;
  border-radius: 25px;
  padding: 0.75em 2em;
  cursor: pointer;
  color: var(--button-color);
  border: solid 2px var(--button-color);
  font-weight: bold;
  font-size: 0.9em;
  font-family: 'Roboto Mono', sans-serif;
  margin-top: 1em;
}

.btn:hover{
  background-color: var(--button-color);
  color: var(--back-color);
}

input:-webkit-autofill{
    box-shadow:0 0 0 50px var(--color-white) inset;
    -webkit-box-shadow: 0 0 0 50px var(--color-white) inset;
    -webkit-text-fill-color: var(--input-color);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

@media screen and (max-width:1536px) {
  .formC{
    width: 50%;
  }
}

@media screen and (max-width:1024px) {
  .formC{
    width: 75%;
  }
}
@media screen and (max-width:640px) {
  .formC{
    width: 90%;
  }
}
</style>