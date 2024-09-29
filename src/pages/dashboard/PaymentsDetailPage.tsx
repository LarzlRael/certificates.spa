import { useParams } from 'react-router-dom'

export const PaymentsDetailPage = () => {
  const params = useParams()
  return <div>{params.idPayment} que fue</div>
}
