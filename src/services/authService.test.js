import * as authService from './authService';

jest.mock('./authService');

describe('Auth Service', () => {
    describe('Get all functionality', () => {
        it('Should receive user', (done) => {

            authService.getUser.mockResolvedValue({ user: { username: 'Pesho' } });

            authService.getUser()
                .then(x => {
                    expect(x.user.username.length).toEqual(5);
                    done();
                });
        });
    });
});