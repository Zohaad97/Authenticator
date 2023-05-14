/* eslint-disable testing-library/prefer-screen-queries */

import { fireEvent, render } from '@testing-library/react'
import CodeItem from './components/code-item'
import CodeForm from './containers/code-form'

describe('CodeItem', () => {
    const defaultProps = {
        logo: 'logo-url',
        title: 'Code Item',
        code: 123456,
        id: 1,
        onCodeExpired: jest.fn(),
    }

    test('renders the logo', () => {
        const { getByAltText } = render(<CodeItem {...defaultProps} />)
        expect(getByAltText('Logo')).toBeInTheDocument()
    })

    test('renders the title', () => {
        const { getByText } = render(<CodeItem {...defaultProps} />)
        expect(getByText('Code Item')).toBeInTheDocument()
    })

    test('renders the code with correct format', () => {
        const { getByText } = render(<CodeItem {...defaultProps} />)
        expect(getByText('123 456')).toBeInTheDocument()
    })
})

describe('CodeForm', () => {
    test('updates form state on input change', () => {
        const { getByPlaceholderText } = render(<CodeForm />)
        const titleInput = getByPlaceholderText('Title') as HTMLInputElement
        const logoUrlInput = getByPlaceholderText(
            'https://example.png'
        ) as HTMLInputElement

        fireEvent.change(titleInput, { target: { value: 'New Title' } })
        fireEvent.change(logoUrlInput, {
            target: { value: 'https://example.com/logo.png' },
        })

        expect(titleInput.value).toBe('New Title')
        expect(logoUrlInput.value).toBe('https://example.com/logo.png')
    })

    test('submits form with valid data', async () => {
        const { getByPlaceholderText, getByText } = render(<CodeForm />)
        const titleInput = getByPlaceholderText('Title') as HTMLInputElement
        const logoUrlInput = getByPlaceholderText(
            'https://example.png'
        ) as HTMLInputElement
        const submitButton = getByText('Submit') as HTMLButtonElement

        fireEvent.change(titleInput, { target: { value: 'New Title' } })
        fireEvent.change(logoUrlInput, {
            target: { value: 'https://example.com/logo.png' },
        })
        const mockFn = jest.fn()

        submitButton.onclick = mockFn
        fireEvent.click(submitButton)
        expect(mockFn).toBeCalledTimes(1)
    })

    test('shows alert when title or logo url is empty', async () => {
        const { getByText } = render(<CodeForm />)
        const submitButton = getByText('Submit') as HTMLButtonElement

        const originalAlert = window.alert
        window.alert = jest.fn()

        fireEvent.click(submitButton)

        expect(window.alert).toHaveBeenCalledWith('Title or logo url is empty')

        window.alert = originalAlert
    })
})
