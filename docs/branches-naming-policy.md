 - ``master`` is a branch which reflects current production state.

- ``release-<version>`` is a branch which freezes state of development  branch to keep track of product releases.

- ``development`` is a branch which contains latest features of the product. When we'll decide that current development branch state is stable and new features contained in it are substantial enough, we'll create new release.

- ``<developer>`` - is a main personal branch of the developer. Developers should merge all their sub branches into it, because personal branches will be merged directly into ``development``. Developers can synchronize with ``development`` branch, but not with ``master`` or ``release-<version>``,because this has no sense, except the case of the hot fixes which should be applied to ```master```, ```development``` and latest ``release-<version>``.


To create personal sub branch or collaboration branch developer should use next prefixes policy:

List of the branch prefixes. Positions in the list represent ordering of the prefixes in the branch name:
- **`<developer>`** - personal branch. This prefix should be first in prefixes chain.
- **`hf`** - hotfix.
- **`ex`** - experimental
- **`e`** - epic
- **`d`** - devops
- **`b`** - back-end
- **`f`** - front-end

Example of usage:
1. **`neketek-ex-e-b-f-web-sessions`**.
2. **`ex-e-b-f-web-sessions`**.

Translation:
1. neketek's experimental epic branch with back-end and front-end implementation of web sessions.
2. experimental epic branch with back-end and front-end implementation of web sessions.

If branch has no **`<developer>`** prefix everyone can push to it, otherwise only owner can push to it.
If developer is working not on his main branch(**`<developer`>** with no suffixes or prefixes) , he should not merge it directly to development.  All developer personal branches should be merged into developer's main branch before merging into development.  Branches with no developer prefixes can be merged directly to development because they should be created for implementation collaboration.  Most of the time you'll be using your **`<developer>-ex`** (personal experimental branch) and **`<developer>`** (main branch).  Branch manager will pull updates only from your main branches or collaboration branches.  
