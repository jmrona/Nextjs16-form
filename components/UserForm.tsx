"use client"

import { FormState, submitUser } from "@/actions/users"
import CheckboxGroup from "./CheckboxGroup"
import Dropdown from "./Dropdown"
import Field from "./Fields"
import React, { useActionState } from "react"
import { actions } from "@/actions"
import { redirect } from "next/navigation"

const initialState: FormState = {
  data: {
    fullname: "",
    age: "",
    country: "",
    interests: [] as string[],
  },
  success: undefined,
  errors: {} as Record<string, string[]>
}

export default function UserForm({ interests }: { interests: Record<string, string> }) {
  const [state, formAction, pending] = useActionState(actions.users.submitUser, initialState)
  const formRef = React.useRef<HTMLFormElement>(null);

  if (state.success) {
    redirect('/');
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-col justify-items-start gap-4 max-w-[700px] w-full">
      <Field
        type="text"
        label="Full name"
        id="fullname"
        name="fullname"
        defaultValue={state.data.fullname}
        error={state.errors.fullname?.[0]}
        required={true}
      />

      <Field
        type="number"
        label="Age"
        id="age"
        name="age"
        min="18"
        max="100"
        defaultValue={state.data.age}
        error={state.errors.age?.[0]}
        required={true}
      />

      <Dropdown
        label="Country"
        id="country"
        name="country"
        required={true}
        defaultValue={state.data.country}
        error={state.errors.country?.[0]}
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'mx', label: 'Mexico' },
        ]}
      />

      <CheckboxGroup
        label="Select your interests"
        name="interests"
        defaultValue={state.data.interests}
        error={state.errors.interests?.[0]}
        required={true}
        options={Object.entries(interests).map(([value, label]) => ({ value, label }))}
      />

      <button
        type="submit"
        className="mt-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Submit
      </button>

      {state?.errors.general && (
        <div className="mt-4 rounded bg-red-100 px-4 py-2 text-red-800">
          {state.errors.general.map((err, idx) => (
            <p key={idx} className="text-pretty">{err}</p>
          ))}
        </div>
      )}
    </form>
  )
}