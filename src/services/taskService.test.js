import * as taskService from './taskService';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
    rest.get('https://tranquil-sea-17355.herokuapp.com/api/tasks', (req, res, ctx) => {
        res(ctx.json({ entities: [{ task: 'Ha-ha' }] }));
    })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Task Service', () => {
    describe('Get all functionality', () => {
        it('Should receive all entities', (done) => {
            taskService.getEntities()
                .then(x => {
                    expect(x.entities.length).toBeGreaterThan(0);
                    done();
                });
        });
    });
});