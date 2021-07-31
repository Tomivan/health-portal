import React from 'react'
import { User32, Stethoscope32, Portfolio32, Chat32, HealthCross32, Grid32 } from '@carbon/icons-react'

import { Container, Spacer, NavWrapper, NavButton, NavLink } from './styles'

const MobileNav = () => {
  return (
    <Container>
      <Spacer />
      <NavWrapper>
        <NavLink to="/dashboard">
          <NavButton
            hasIconOnly
            renderIcon={Grid32}
            iconDescription="Dashboard"
            tooltipPosition="bottom"
          />
        </NavLink>
        <NavLink to="/medical-records">
          <NavButton
            hasIconOnly
            renderIcon={Portfolio32}
            iconDescription="Medical Records"
            tooltipPosition="bottom"
          />
        </NavLink>
        <NavLink to="/patients">
          <NavButton
            hasIconOnly
            renderIcon={HealthCross32}
            iconDescription="Patients"
            tooltipPosition="bottom"
          />
        </NavLink>
        <NavLink to="/health-workers">
          <NavButton
            hasIconOnly
            renderIcon={Stethoscope32}
            iconDescription="Health Workers"
            tooltipPosition="bottom"
          />
        </NavLink>
        <NavLink to="/admin">
          <NavButton
            hasIconOnly
            renderIcon={User32}
            iconDescription="Admin"
            tooltipPosition="bottom"
          />
        </NavLink>
        <NavLink to="/notifications">
          <NavButton
            hasIconOnly
            renderIcon={Chat32}
            iconDescription="Notifications"
            tooltipPosition="bottom"
          />
        </NavLink>
      </NavWrapper>
    </Container>
  )
}

export default MobileNav;
