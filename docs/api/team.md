# Team API

This document lists all team-related APIs and their purpose.  
All endpoints assume an authenticated student context.

---

## POST /api/team

**Create Team**

Creates a new team and assigns the caller as the team leader.  
A unique team code is generated server-side.

---

## POST /api/team/join

**Join Team**

Allows a student to join an existing team using a valid team code.

---

## PATCH /api/team

**Update Team**

Updates team metadata such as name, description, project details, or links.  
Only the team leader is allowed to perform this action.

---

## POST /api/team/remove-member

**Remove Team Member**

Allows the team leader to remove another student from the team.  
The leader cannot remove themselves.

---

## POST /api/team/transfer-leadership

**Transfer Leadership**

Transfers team leadership from the current leader to another team member.

---

## POST /api/team/leave

**Leave Team**

Allows a student to leave their current team.  
Team leaders must transfer leadership before leaving.

---

## DELETE /api/team

**Delete Team**

Deletes the current team.  
Only the team leader can delete the team, and all members are detached.

---

## Notes

- Team ownership is determined by `team.leaderId`
- Team membership is determined by `student.teamId`
- Authorization is enforced server-side
- Validation is handled using schema validators
