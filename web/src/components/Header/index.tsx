import { HeaderContainer, HeaderContent, NewTransitionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { useWindowSize } from '../../hooks/useWindowSize'

export function Header() {
  const windowSize = useWindowSize()
  const imageSize = windowSize < 301 ? 20 : windowSize <= 500 ? 32 : 41
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" height={imageSize} />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransitionButton>Nova Transação</NewTransitionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
