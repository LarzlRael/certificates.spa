import React from 'react'
import { Field, FieldArray, useField } from 'formik'
import { socialNetworks } from '../../data/infoData'

import { FaTimesCircle, FaPlusCircle } from 'react-icons/fa'

import BoxFlex from '../boxex/BoxFlex'
import { RedesSociales } from '../../interfaces/ResponseInterfaces'
import { Button } from '@/components/ui/button'
interface Props {
  label: string
  name: string
  [x: string]: any
}
export const SelectAdd = ({ ...props }: Props) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label className="Form__label--pyme">Redes Sociales</label>
      <FieldArray name={props.name}>
        {({ insert, remove, push }) => (
          <div>
            {field.value!.length > 0 &&
              field.value!.map((friend: RedesSociales, index: number) => (
                <div className="row" key={index}>
                  <div className="col">
                    <select
                      {...field}
                      value={field.value[index].nombre}
                      name={`${props.name}.${index}.nombre`}
                      className="Form__input--pyme"
                      /* disabled={loadingForm} */
                    >
                      {socialNetworks.map((social) => {
                        return (
                          <option value={social} key={social}>
                            {social}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <BoxFlex justify="space-between" direction="row">
                    <label
                      className="Form__label--pyme"
                      htmlFor={`${props.name}.${index}.urlRedSocial`}
                    >
                      URL
                    </label>
                    <FaTimesCircle
                      type="button"
                      color="red"
                      size={20}
                      className="secondary"
                      onClick={() => remove(index)}
                    />
                  </BoxFlex>
                  <BoxFlex direction="row">
                    <Field
                      name={`${props.name}.${index}.urlRedSocial`}
                      placeholder="Ingrese el Url de la red social"
                      type="text"
                      className="Form__input--pyme"
                    />
                  </BoxFlex>
                </div>
              ))}
            <Button
              type="button"
              /* margin="10px 0" */
              onClick={() => {
                push({
                  nombre: socialNetworks[0],
                  urlRedSocial: '',
                })
              }}
            >
              <FaPlusCircle size={20} />
              Agregar Red social
            </Button>
          </div>
        )}
      </FieldArray>
    </>
  )
}
