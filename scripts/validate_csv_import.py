#!/usr/bin/env python3
"""Validate CSV task imports before reporting."""

from __future__ import annotations

import csv
import sys
from collections import Counter
from pathlib import Path


REQUIRED = ("title", "owner", "status")


def validate(path: Path) -> int:
    with path.open(encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle))
    if not rows:
        print("No rows found")
        return 1

    missing = []
    for index, row in enumerate(rows, start=2):
        for field in REQUIRED:
            if not str(row.get(field, "")).strip():
                missing.append((index, field))

    titles = Counter(row.get("title", "").strip() for row in rows)
    duplicates = [title for title, count in titles.items() if title and count > 1]

    print(f"Rows: {len(rows)}")
    print(f"Missing required fields: {len(missing)}")
    for index, field in missing[:10]:
        print(f"  line {index}: missing {field}")
    print(f"Duplicate titles: {len(duplicates)}")
    for title in duplicates[:10]:
        print(f"  {title}")
    return 1 if missing or duplicates else 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: validate_csv_import.py <file.csv>")
        sys.exit(2)
    sys.exit(validate(Path(sys.argv[1])))
