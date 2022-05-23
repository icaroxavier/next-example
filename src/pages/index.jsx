import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getCepInfoRequest } from "../redux/utils/actions"

export default function Home() {

  const dispatch = useAppDispatch()
  const { cepInfo } = useAppSelector(store => store.utils)

  useEffect(() => {
    dispatch(getCepInfoRequest("60732-999"))
  }, [dispatch])

  console.log(cepInfo)

  return (
    <div>
      Hey!
    </div>
  )
}
