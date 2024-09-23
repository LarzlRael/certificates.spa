import { useParams } from 'react-router-dom'
import useAxios from '../hooks/useAxios'

export const CourseEnrollment = () => {
  //get param idCourse
  const params = useParams()
  const { response, loading } = useAxios<any>({
    url: `/course/course-detail/${params.idCourse}`,
    method: 'GET',
  })
  const { response: form, loading: loadingForm } = useAxios<any>({
    url: `/course/fields-course-by-id/${params.idCourse}`,
    method: 'GET',
  })
  return (
    <div>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <div>
          <h1>{response?.courseName}</h1>
          <p>{response?.courseDescription}</p>
          <h2>Formulario de inscripción</h2>
          {loadingForm ? (
            <h1>Cargando...</h1>
          ) : (
            <form>
              {form.form?.fields?.map((field: any) => (
                <div key={field.id}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                  />
                </div>
              ))}
              <button type="submit">Enviar</button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
