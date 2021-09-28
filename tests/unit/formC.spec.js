import { mount } from "@vue/test-utils";
import formC from "@/components/formC.vue";

/*describe("formC.vue", () => {
  it("renders props.msg when passed", () => {
    //const msg = "new message";
    const modeProp = true;
    const wrapper = shallowMount(formC, {
      propsData: { modeProp },
    });
    //expect(wrapper.text()).toMatch(modeProp);
    const nameInput = wrapper.find('input[id="name"]');
    await nameInput.setValue('some value')
  });
});
*/

describe("formC.vue", () => {
  const wrapper = mount(formC,{
    propsData: {
      typeMode: true
    }
  })

  const nameInput = wrapper.find('#name')
  const emailInput = wrapper.find('#email')
  const subjectInput = wrapper.find('#subject')
  const messageInput = wrapper.find('#message')
  

  test('nameLength0', async () => {
  
    await nameInput.setValue('any')
    await nameInput.setValue('')
  
    let errorN = wrapper.find('#nameError')
  
    expect(errorN.text()).toBe('Name is required');
  
  }) 


  test('nameLength<5', async () => {
    
    await nameInput.setValue('any')
  
    let errorN = wrapper.find('#nameError')
  
    expect(errorN.text()).toBe('Name must be at least 5 characters long');
  })


  test('nameLength>50', async () => {

    await nameInput.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec')
  
    let errorN = wrapper.find('#nameError')
  
    expect(errorN.text()).toBe('Name must be under 50 characters long');
  })


  test('emailLength0', async () => {
  
    await emailInput.setValue('any')
    await emailInput.setValue('')
  
    let errorN = wrapper.find('#emailError')
  
    expect(errorN.text()).toBe('Email is required');
  }) 

  test('emailInvalid', async () => {
  
    await emailInput.setValue('any@fd')
  
    let errorN = wrapper.find('#emailError')
  
    expect(errorN.text()).toBe('Email is not valid');
  }) 


  test('subjectChars>100', async () => {
  
    await subjectInput.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero felis, tincidunt id dictum vitae')
  
    let errorN = wrapper.find('#subjectError')
  
    expect(errorN.text()).toBe('Subject must be under 100 characters long');
  }) 


  test('messageChars>500', async () => {
  
    await messageInput.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero felis, tincidunt id dictum vitae, facilisis a tellus. Praesent vitae erat at orci volutpat pharetra. Pellentesque id mattis est, a laoreet nulla. Duis ut nulla porta, pretium ex non, ultrices dui. Nullam non nibh eu massa bibendum porta porta in diam. Duis eu ante sed elit pellentesque dignissim id eu elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi ut consectetur nisi. Cras quis porta quam. Mauris vel arcu sed dui lobortis aliquam a non massa.')
  
    let errorN = wrapper.find('#messageError')
  
    expect(errorN.text()).toBe('Message must be under 500 characters long');
  }) 

})