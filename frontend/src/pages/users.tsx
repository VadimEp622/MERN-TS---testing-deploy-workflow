import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadUsers } from "../store/userSlice";

export function Users() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((storeState) => storeState.userModule.users);
  const isLoadingUsers = useAppSelector(
    (storeState) => storeState.userModule.isLoadingUsers
  );

  return (
    <section>
      <h1>Hello from Users!</h1>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            dispatch(loadUsers());
          }}
        >
          Get Users:
        </button>
      </section>

      {isLoadingUsers ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {users.length === 0 ? (
            <h2>No users yet</h2>
          ) : (
            users.map((user: any) => (
              <div key={user._id}>{user.fullname}</div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default Users;
