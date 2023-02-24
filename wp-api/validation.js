const yup = require('yup')

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Missing username')
    .min(4, 'username should have at least 4 characters'),
  name: yup.string().required('Missing name').min(6, 'username should have at least 6 characters'),

  email: yup.string().required('Missing email').email('please enter a valid email address'),
  password: yup
    .string()
    .required('Missing password')
    .min(6, 'password should have at least 6 characters'),
})

const loginSchema = yup.object().shape({
  email: yup.string().required('Missing email').email('please enter a valid email address'),
  password: yup
    .string()
    .required('Missing password')
    .min(6, 'password should have at least 6 characters'),
})

module.exports.loginSchema = loginSchema
module.exports.registerSchema = registerSchema
