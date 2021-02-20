import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import auth, { MeProcess } from '../../../redux/auth'
import { RootState } from '../../../redux/store'
import { Redirect } from 'react-router-dom'
import LoadingView from './LoadingView'
import UserContent from './UserContent'

enum ViewState {
  Loading,
  Failed,
  Success
}

export default function DashboardPage() {
  const dispatch: any = useDispatch()
  const [viewState, setViewState] = React.useState(ViewState.Loading)

  const loadUser = React.useCallback(async () => {
    try {
      await dispatch(auth.execute(MeProcess))
      setViewState(ViewState.Success)
    } catch (e) {
      setViewState(ViewState.Failed)
    }
  }, [dispatch, setViewState])

  React.useEffect(() => {
    loadUser()
  }, [])

  const user = useSelector((store: RootState) => {
    return store.auth.user
  })

  return (
    <Row className="justify-content-center m-3">
      <Col className="bg-light rounded border" xs={12} lg={8} xl={6}>
        {
          (() => {
            if (viewState === ViewState.Loading) {
              return (
                <LoadingView/>
              )
            } else if (viewState === ViewState.Success) {
              return (
                <UserContent user={user} />
              )
            } else {
              return (
                <Redirect to="/" />
              )
            }
          })()
        }
      </Col>
    </Row>
  )
}
