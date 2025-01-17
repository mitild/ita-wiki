import { useState } from 'react'
import styled from 'styled-components'
import { FlexBox, colors, dimensions } from '../../styles'
import { Text } from '../atoms'
import { CreateAuthor } from './CreateAuthor'
import { ResourceTitleLink } from './ResourceTitleLink'
import { VoteCounter } from './VoteCounter'
import icons from '../../assets/icons'

const CardContainerStyled = styled(FlexBox)`
  background-color: ${colors.white};
  border-radius: ${dimensions.borderRadius.sm};
  border: 1px solid ${colors.gray.gray4};
  height: 7rem;
  padding: ${dimensions.spacing.xxs} ${dimensions.spacing.xs};
  width: 100%;
  min-width: 15rem;
  position: relative;
`

const StyledSvg = styled.div`
  position: absolute;
  top: ${dimensions.spacing.xxs};
  right: ${dimensions.spacing.xxs};
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.5);
`

const CounterContainerStyled = styled(FlexBox)`
  margin: 0 ${dimensions.spacing.xs};
  align-self: flex-start;

  ${Text} {
    margin: 0rem;
  }
`

const FlexBoxStyled = styled(FlexBox)`
  height: 100%;

  ${FlexBox} {
    gap: 2px;
  }

  ${Text} {
    margin: 0rem;
    margin-top: 2px;
  }
`

type TCardResource = {
  createdBy: string
  createdOn: string
  description: string
  img: string | undefined
  id: string
  likes?: number
  title: string
  updatedOn?: string
  url: string
  handleAccessModal: () => void
}

export const CardResource = ({
  createdBy,
  createdOn,
  description,
  img,
  likes,
  id,
  title,
  updatedOn,
  url,
  handleAccessModal,
  ...rest
}: TCardResource) => {
  const [editable] = useState<boolean>(false)

  return (
    <CardContainerStyled
      data-testid="resource-card"
      direction="row"
      align="center"
      justify="flex-start"
      id={id}
      {...rest}
    >
      {editable && (
        <StyledSvg>
          <img src={icons.editPen} alt="Editar recurso" />
        </StyledSvg>
      )}
      {Number.isInteger(likes) && (
        <CounterContainerStyled>
          <VoteCounter
            voteCount={likes || 0}
            resourceId={id}
            handleAccessModal={handleAccessModal || undefined}
          />
        </CounterContainerStyled>
      )}
      <FlexBoxStyled align="start" justify="space-between" gap="4px">
        <ResourceTitleLink description={description} title={title} url={url} />
        <CreateAuthor createdBy={createdBy} createdOn={createdOn} img={img} />
      </FlexBoxStyled>
    </CardContainerStyled>
  )
}
