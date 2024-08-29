import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ContentTypePage from '@/app/[content_type]/page';

// Mock Next.js router
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

// Mock NextAuth
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

describe('ContentTypePage', () => {
    const mockPush = jest.fn();
    const mockUseRouter = useRouter;
    const mockUseSession = useSession;

    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            push: mockPush,
        });

        mockUseSession.mockReturnValue({
            data: { user: { name: 'Test User' } },
            status: 'authenticated',
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('redirects to signin if unauthenticated', async () => {
        mockUseSession.mockReturnValueOnce({
            data: null,
            status: 'unauthenticated',
        });

        render(<ContentTypePage params={{ content_type: 'manga' }} />);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/api/auth/signin');
        });
    });

    test('fetches and displays content', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    content: [{ id: 1, title: 'Beck' }],
                    totalCount: 1,
                    genreList: [{ id: 1, name: 'slice of life' }],
                }),
            })
        );

        render(<ContentTypePage params={{ content_type: 'manga' }} />);

        await waitFor(() => {
            expect(screen.getByText('Beck')).toBeInTheDocument();
        });

        expect(screen.getByText('slice of life')).toBeInTheDocument();
    });

    test('handles option change', async () => {
        render(<ContentTypePage params={{ content_type: 'manga' }} />);

        const radioButton = screen.getByLabelText('Sort by Z-A');
        fireEvent.click(radioButton);

        await waitFor(() => {
            expect(radioButton).toBeChecked();
        });
    });

    test('handles limit change', async () => {
        render(<ContentTypePage params={{ content_type: 'manga' }} />);

        const limitInput = screen.getByLabelText('Limit');
        fireEvent.change(limitInput, { target: { value: '16' } });

        await waitFor(() => {
            expect(limitInput.value).toBe('16');
        });
    });
});