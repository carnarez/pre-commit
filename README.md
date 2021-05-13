**Small hack to run containerized pre-commit hooks.** Nothing to do with the brilliant
`Python` [package with the same name](https://pre-commit.com/), just a plain
[`git` hook](https://git-scm.com/docs/githooks)).

> **Why?**

Although `pre-commit` (and similar tools) are performing *very* well, I like the idea of
having a local *runner* defined in a similar way as what one would expect from the CI
of a code repository. 

Some linters/checkers were written in different syntaxes, and I do not feel like
keeping/updating all those interpreters and other compilers on my system.

The calls to those linters/checkers are also defined *in clear*, and I do not need to
guess/dig through various layers of wrappers and config files to modify them.

I am also obsessed with keeping my system clean of all superflous dependencies. 

> **How?**

[`Docker`](https://www.docker.com/). A container run triggered as a pre-commit hook from
the `git` workflow. And a [`cron`](https://en.wikipedia.org/wiki/Cron) job on my local
system to rebuild the image from scratch every so often (after updating some package
versions).

To install the hook:

1. Copy, then adapt the content of the `.pre-commit/` folder in the target repo. By
   "adapt" I mean:
   * Check/update the content of the `.pre-commit/hooks.yaml` file:
     - Each hook has a name.
     - `cmd` is the executable that needs to be called (full path if not part of the
       `PATH`).
     - `flags` contains the flags that will be fed to the executable.
     - `check` contains the flags fed to the executable (on top of the previous `flags`)
       that *check* if some rework needs to happen **without modifying the files
       themselves**.
   * [Un]Register your hooks from the `.pre-commit/entrypoint.sh` file, associated with
     the files if should run on (identified via its extension). (You should only need to
     modify the `Bash` array at the top of the script, after the `declare -A`
     statement.)
2. Copy the `pre-commit` file -or the content thereof- to a `.git/hooks/pre-commit` one.
   Make sure the container runs as the same user as your own (as given by `echo $UID`)
   by feeding it to the `--build-arg uid=` flag in the `pre-commit` file.

The rest of the `Bash` code defined in the `.pre-commit/entrypoint.sh` is fairly simple:
fetch the staged files from `git` itself, apply each hook associated with each file
extension on the latter. First a check run, then the real deal to output errors or lint
content (thus modifying the files). If the check run exited with a non-null error code
the commit will be cancelled as the files are modified *after* staging and need to be
re-staged for commit.

As mentioned above, this remains a crude hack, but satisfies my needs (without bothering
colleagues with extra things to install on their respective systems).
