// web/src/pages/ContactPage/ContactPage.tsx
import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  Label,
  useForm,
  FormError,
} from '@redwoodjs/forms'
import { Metadata, useMutation } from '@redwoodjs/web'
import './ContactPage.css' // normales CSS importieren
import { Toaster, toast } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your message!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    create({
      variables: {
        input: data,
      },
    })
  }

  const emailValidation = /^[^@]+@[^.]+\..+$/

  return (
    <>
      <Metadata title="Contact" description="Contact page" />
      <Toaster />

      <h1 className="title">ContactPage</h1>

      <Form
        className="contact-form"
        onSubmit={onSubmit}
        formMethods={formMethods}
        error={error}
      >
        <FormError error={error} wrapperClassName="form-error" />
        <Label htmlFor="name">Name</Label>
        <TextField
          id="name"
          name="name"
          placeholder="Name"
          className="form-field"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="name" className="error" />

        <Label htmlFor="email">Email</Label>
        <TextField
          id="email"
          name="email"
          placeholder="Email"
          className="form-field"
          validation={{
            required: true,
            pattern: { value: emailValidation },
          }}
        />
        <FieldError name="email" className="error" />

        <Label htmlFor="message">Message</Label>
        <TextAreaField
          id="message"
          name="message"
          placeholder="Message"
          className="form-field"
          validation={{ required: true }}
        />
        <FieldError name="message" className="error" />

        <Submit disabled={loading} className="submit-button">
          Send Message
        </Submit>
      </Form>
    </>
  )
}

export default ContactPage
