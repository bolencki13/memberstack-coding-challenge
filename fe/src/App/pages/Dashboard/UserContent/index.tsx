import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import CheckoutForm from './CheckoutForm'
import { UserJSON } from '../../../../types'
import { useDispatch, useSelector } from 'react-redux'
import auth, { LogoutProcess } from '../../../../redux/auth'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import plan, { PlanRetrieveProcess } from '../../../../redux/plan'
import { RootState } from '../../../../redux/store'
import LoadingView from '../LoadingView'

type UserContent = {
  user: UserJSON
}

export default function UserContent (props: UserContent) {
  const dispatch: any = useDispatch()
  const history = useHistory()

  const getPlan = React.useCallback(async () => {
    try {
      await dispatch(plan.execute(PlanRetrieveProcess))
    } catch (e) {
      window.alert('Failed to get plan from server.')
    }
  }, [dispatch])

  const { defaultPlan, payment } = useSelector((state: RootState) => {
    return {
      defaultPlan: state.plan.default,
      payment: null
    }
  })

  React.useEffect(() => {
    getPlan()
  })

  return (
    <Row className="p-3">
      <Col xs={12}>
        <Row className="align-items-center">
          <Col>
            <h1>Welcome</h1>
          </Col>
          <Col className="text-right">
            <Button variant="outline-danger" size="sm" onClick={async () => {
              try {
                await dispatch(auth.execute(LogoutProcess))
              } catch (e) {
                console.log(e)
              } finally {
                history.push('/')
              }
            }}>Logout</Button>
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <p className="mb-0"><span className="font-weight-bold">Full Name:</span> {props.user.fullName}</p>
        <p className="mb-0"><span className="font-weight-bold">Email:</span> {props.user.email}</p>
        <p className="mb-0"><span className="font-weight-bold">Joined:</span> {moment(props.user.createdAt).format('LLLL')}</p>
      </Col>
      <Col xs={12}>
        <hr/>
      </Col>
      <Col xs={12}>
        {
          (() => {
            if (payment) {
              return (
                <p>payment</p>
              )
            } else if (defaultPlan) {
              return (
                <CheckoutForm plan={defaultPlan} />
              )
            } else {
              return (
                <LoadingView />
              )
            }
          })()
        }
      </Col>
    </Row>
  )
}
